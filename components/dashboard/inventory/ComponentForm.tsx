'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  type: z.string(),
  name: z.string(),
  color: z.string().optional(),
  quantity: z.coerce.number(),
  maxQuantity: z.coerce.number(),
});

const ComponentForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      name: '',
      color: '',
      quantity: 0,
      maxQuantity: 10,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Add this to DB
    const response = await fetch('/api/componentInventory', {
      method: 'POST',
      body: JSON.stringify({ values }),
      headers: { 'content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to create component');
    }

    router.refresh();
    router.push('/dashboard/inventory/components');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-1/2 mx-auto"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="shelf">Shelf</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                  <SelectItem value="front">Front</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bed">Bed</SelectItem>
                  <SelectItem value="trim">Trim</SelectItem>
                  <SelectItem value="box">Box</SelectItem>
                  <SelectItem value="glide">Glide</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {form.watch().type !== 'box' && form.watch().type !== 'glide' && (
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Morning Mist">Morning Mist</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Quantity" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Max Quantity" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ComponentForm;
