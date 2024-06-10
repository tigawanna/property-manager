import { Link, type PageProps } from "rakkasjs";
export default function NotFoundPage({}: PageProps) {
  return (
    <section className="w-full  min-h-screen flex flex-col   gap-5 bg-base-200">
      <div className="w-full h-screen  flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[30%]">
          <svg
            width="200px"
            height="200px"
            viewBox="-20 0 190 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-secondary"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M38.155 140.475L48.988 62.1108L92.869 67.0568L111.437 91.0118L103.396 148.121L38.155 140.475ZM84.013 94.0018L88.827 71.8068L54.046 68.3068L44.192 135.457L98.335 142.084L104.877 96.8088L84.013 94.0018ZM59.771 123.595C59.394 123.099 56.05 120.299 55.421 119.433C64.32 109.522 86.05 109.645 92.085 122.757C91.08 123.128 86.59 125.072 85.71 125.567C83.192 118.25 68.445 115.942 59.771 123.595ZM76.503 96.4988L72.837 99.2588L67.322 92.6168L59.815 96.6468L56.786 91.5778L63.615 88.1508L59.089 82.6988L64.589 79.0188L68.979 85.4578L76.798 81.5328L79.154 86.2638L72.107 90.0468L76.503 96.4988Z"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center gap-2  p-1">
          <p className="text-3xl md:text-4xl lg:text-5xl  mt-12 font-bold">
            Page Not Found
          </p>

          <p className="md:text-lg lg:text-xl text-center px-2">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link
            href="/"
            className="flex items-center bg-primary hover:brightness-75 rounded-lg font-semibold space-x-2  px-4 py-2 mt-12  transition duration-150"
            title="Return Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
