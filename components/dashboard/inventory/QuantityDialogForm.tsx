'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, usePathname } from 'next/navigation';

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
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

type inventoryProps = {
  _id: string;
  type: string;
  name: string;
  color: string;
  quantity: number;
};

const formSchema = z.object({
  // _id: z.string(),
  // type: z.string(),
  // name: z.string(),
  // color: z.string(),
  quantity: z.coerce.number(),
});

export function QuantityDialogForm({
  _id,
  type,
  name,
  color,
  quantity,
}: inventoryProps) {
  const path = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // _id: _id,
      // type: type,
      // name: name,
      // color: color,
      quantity: quantity,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedComponent = {
      _id: _id,
      prevQuantity: quantity,
      newQuantity: values.quantity,
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
        <DialogDescription>{type}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={`${quantity}`} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-start">
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
