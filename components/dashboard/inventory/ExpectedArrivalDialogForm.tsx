'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, usePathname } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

type inventoryProps = {
  _id: string;
  type: string;
  name: string;
  color: string;
  expectedArrival: Date;
};

const formSchema = z.object({
  expectedArrival: z.date().nullable(),
});

export function ExpectedArrivalDialogForm({
  _id,
  type,
  name,
  color,
  expectedArrival,
}: inventoryProps) {
  const path = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expectedArrival: expectedArrival,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedComponent = {
      _id: _id,
      expectedArrival: values.expectedArrival,
    };

    const response = await fetch('/api/componentInventory', {
      method: 'PATCH',
      body: JSON.stringify({ updatedComponent }),
      headers: { 'content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to update component');
    }

    router.push(path);
    router.refresh();
  }
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex justify-between w-11/12">
          <span>{name}</span> <span>{color}</span>
        </DialogTitle>
        <DialogDescription className="flex justify-start">
          {type[0].toUpperCase() + type.substring(1, type.length)}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="expectedArrival"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expected Arrival</FormLabel>
                <div className="flex justify-between">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            typeof field.value === 'string' ? (
                              // Render field.value if it exists and is a string
                              <span>{field.value}</span>
                            ) : (
                              // Use formatDate if field.value exists but is not a string
                              <span>
                                {formatDate(field.value.toISOString())}
                              </span>
                            )
                          ) : (
                            // Render 'Pick a date' if field.value doesn't exist
                            <span>Pick a date</span>
                          )}

                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        //@ts-ignore
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={() => form.setValue('expectedArrival', null)}
                    >
                      Arrived
                    </Button>
                  </DialogClose>
                </div>
              </FormItem>
            )}
          />
          <DialogFooter className="mt-4 sm:justify-start flex flex-col gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="submit">Update</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
