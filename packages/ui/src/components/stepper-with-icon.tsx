"use client";

import { Button } from "@renovabit/ui/components/ui/button";
import { defineStepper } from "@renovabit/ui/components/ui/stepper";
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Fragment } from "react";

const { Stepper } = defineStepper(
  {
    id: "step-1",
    title: "Step 1",
    icon: <HomeIcon />,
  },
  {
    id: "step-2",
    title: "Step 2",
    icon: <SettingsIcon />,
  },
  {
    id: "step-3",
    title: "Step 3",
    icon: <UserIcon />,
  }
);

export function StepperWithIcon() {
  return (
    <Stepper.Provider className="space-y-4" variant="horizontal">
      {({ methods }) => (
        <Fragment key={methods.current.id}>
          <Stepper.Navigation>
            {methods.all.map((step) => (
              <Stepper.Step
                icon={step.icon}
                key={step.id}
                of={step.id}
                onClick={() => methods.goTo(step.id)}
              >
                <Stepper.Title>{step.title}</Stepper.Title>
              </Stepper.Step>
            ))}
          </Stepper.Navigation>
          {methods.switch({
            "step-1": (step) => <Content id={step.id} />,
            "step-2": (step) => <Content id={step.id} />,
            "step-3": (step) => <Content id={step.id} />,
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
            <Button onClick={methods.isLast ? methods.reset : methods.next}>
              {methods.isLast ? "Reset" : "Next"}
            </Button>
          </Stepper.Controls>
        </Fragment>
      )}
    </Stepper.Provider>
  );
}

const Content = ({ id }: { id: string }) => (
  <Stepper.Panel className="h-[200px] content-center rounded border bg-secondary p-8 text-secondary-foreground">
    <p className="font-normal text-xl">Content for {id}</p>
  </Stepper.Panel>
);
