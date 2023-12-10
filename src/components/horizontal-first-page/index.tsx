import HorizontalChildWrap from "../horizontal-scroll-wrap/horizontal-child-wrap";
import ViewWrapper from "../view-wrapper";

export default function HorizontalFirstPage({
  title,
  fromColor,
  toColor,
  emoji,
  isLoading,
}: {
  title: string;
  fromColor: string;
  toColor: string;
  emoji: string;
  isLoading?: boolean;
}) {
  return (
    <HorizontalChildWrap>
      <div
        className={`flex h-dvh min-h-full relative w-screen animate-background-move flex-col items-center justify-center gap-12 bg-gradient-to-tl text-neutral-800 from-${fromColor}-300 to-${toColor}-300 `}
      >
        <ViewWrapper>
          <div className="flex animate-fade-in flex-col items-center gap-2">
            <p className="text-4xl">{emoji}</p>
            <h3 className="max-w-5xl px-2 text-center text-3xl font-black opacity-90 sm:px-5 md:text-5xl">
              {title}
            </h3>
            <textarea></textarea>
          </div>
        </ViewWrapper>
      </div>
    </HorizontalChildWrap>
  );
}
