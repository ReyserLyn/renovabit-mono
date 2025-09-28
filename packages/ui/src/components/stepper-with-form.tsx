"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@renovabit/ui/components/ui/button";
import { Form } from "@renovabit/ui/components/ui/form";
import { Input } from "@renovabit/ui/components/ui/input";
import { defineStepper } from "@renovabit/ui/components/ui/stepper";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const shippingSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(5, "Postal code is required"),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required"),
  expirationDate: z.string().min(5, "Expiration date is required"),
  cvv: z.string().min(3, "CVV is required"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

const ShippingForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ShippingFormValues>();

  return (
    <div className="space-y-4 text-start">
      <div className="space-y-2">
        <label
          className="block font-medium text-primary text-sm"
          htmlFor={register("address").name}
        >
          Address
        </label>
        <Input
          id={register("address").name}
          {...register("address")}
          className="block w-full rounded-md border p-2"
        />
        {errors.address && (
          <span className="text-destructive text-sm">
            {errors.address.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          className="block font-medium text-primary text-sm"
          htmlFor={register("city").name}
        >
          City
        </label>
        <Input
          id={register("city").name}
          {...register("city")}
          className="block w-full rounded-md border p-2"
        />
        {errors.city && (
          <span className="text-destructive text-sm">
            {errors.city.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          className="block font-medium text-primary text-sm"
          htmlFor={register("postalCode").name}
        >
          Postal Code
        </label>
        <Input
          id={register("postalCode").name}
          {...register("postalCode")}
          className="block w-full rounded-md border p-2"
        />
        {errors.postalCode && (
          <span className="text-destructive text-sm">
            {errors.postalCode.message}
          </span>
        )}
      </div>
    </div>
  );
};

function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PaymentFormValues>();

  return (
    <div className="space-y-4 text-start">
      <div className="space-y-2">
        <label
          className="block font-medium text-primary text-sm"
          htmlFor={register("cardNumber").name}
        >
          Card Number
        </label>
        <Input
          id={register("cardNumber").name}
          {...register("cardNumber")}
          className="block w-full rounded-md border p-2"
        />
        {errors.cardNumber && (
          <span className="text-destructive text-sm">
            {errors.cardNumber.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          className="block font-medium text-primary text-sm"
          htmlFor={register("expirationDate").name}
        >
          Expiration Date
        </label>
        <Input
          id={register("expirationDate").name}
          {...register("expirationDate")}
          className="block w-full rounded-md border p-2"
        />
        {errors.expirationDate && (
          <span className="text-destructive text-sm">
            {errors.expirationDate.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          className="block font-medium text-primary text-sm"
          htmlFor={register("cvv").name}
        >
          CVV
        </label>
        <Input
          id={register("cvv").name}
          {...register("cvv")}
          className="block w-full rounded-md border p-2"
        />
        {errors.cvv && (
          <span className="text-destructive text-sm">{errors.cvv.message}</span>
        )}
      </div>
    </div>
  );
}

function CompleteComponent() {
  return <div className="text-center">Thank you! Your order is complete.</div>;
}

const { Stepper, useStepper } = defineStepper(
  {
    id: "shipping",
    title: "Shipping",
    schema: shippingSchema,
    Component: ShippingForm,
  },
  {
    id: "payment",
    title: "Payment",
    schema: paymentSchema,
    Component: PaymentForm,
  },
  {
    id: "complete",
    title: "Complete",
    schema: z.object({}),
    Component: CompleteComponent,
  }
);

export function StepperWithForm() {
  return (
    <Stepper.Provider>
      <FormStepperComponent />
    </Stepper.Provider>
  );
}

const FormStepperComponent = () => {
  const methods = useStepper();

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(methods.current.schema),
  });

  const onSubmit = (values: z.infer<typeof methods.current.schema>) => {
    // biome-ignore lint/suspicious/noAlert: <Example>
    alert(
      `Form values for step ${methods.current.id}: ${JSON.stringify(values)}`
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper.Navigation>
          {methods.all.map((step) => (
            <Stepper.Step
              key={step.id}
              of={step.id}
              onClick={async () => {
                const valid = await form.trigger();
                if (!valid) {
                  return;
                }
                methods.goTo(step.id);
              }}
              type={step.id === methods.current.id ? "submit" : "button"}
            >
              <Stepper.Title>{step.title}</Stepper.Title>
            </Stepper.Step>
          ))}
        </Stepper.Navigation>
        {methods.switch({
          shipping: ({ Component }) => <Component />,
          payment: ({ Component }) => <Component />,
          complete: ({ Component }) => <Component />,
        })}
        <Stepper.Controls>
          {!methods.isLast && (
            <Button
              disabled={methods.isFirst}
              onClick={methods.prev}
              type="button"
              variant="secondary"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={() => {
              if (methods.isLast) {
                return methods.reset();
              }
              methods.beforeNext(async () => {
                const valid = await form.trigger();
                if (!valid) {
                  return false;
                }
                return true;
              });
            }}
            type="submit"
          >
            {methods.isLast ? "Reset" : "Next"}
          </Button>
        </Stepper.Controls>
      </form>
    </Form>
  );
};
