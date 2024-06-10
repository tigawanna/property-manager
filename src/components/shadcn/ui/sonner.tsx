import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group z-50 ]"
      
      toastOptions={{
        style: {
          // background: `var(--backeground-darker)`,
          // color: `var(--foreground)`,
          // zIndex: 1000000000
        },

        classNames: {
          // toast: `group toast rounded-lg  min-h-fit
          //   group-[.toaster]:border-border group-[.toaster]:shadow-lg`,
          toast:
            `group toast rounded-lg  min-h-fit group-[.toaster]:bg-background 
            group-[.toaster]:text-foreground group-[.toaster]:border-border 
            group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto w-[10px]`,

          title: " text-2xl font-bold ",
          description: " text-sm ",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-content",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
