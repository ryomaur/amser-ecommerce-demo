"use client";

import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface TechnologyModalProps {
  subject: "material" | "affordability" | "movement";
  isOpen: boolean;
  onClose: () => void;
}

const TechnologyModal: React.FC<TechnologyModalProps> = ({
  subject,
  isOpen,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  const movementBody = (
    <div className="flex w-full flex-col items-center justify-center p-8 md:p-16">
      <h1 className="text-center text-2xl font-bold">ムーブメント</h1>
      <p className="mt-8">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。
      </p>
    </div>
  );

  const materialBody = (
    <div className="flex w-full flex-col items-center justify-center p-8 md:p-16">
      <h1 className="text-center text-2xl font-bold">耐久性</h1>
      <p className="mt-8">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。
      </p>
    </div>
  );

  const affordabilityBody = (
    <div className="flex w-full flex-col items-center justify-center p-8 md:p-16">
      <h1 className="text-center text-2xl font-bold">お求めやすさ</h1>
      <p className="mt-8">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。
      </p>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden bg-neutral-800/80 outline-none backdrop-blur focus:outline-none">
          <div className="mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
            <div
              className={`h-full transition duration-300 ${showModal ? "opacity-100" : "opacity-0"} `}
            >
              <div className="relative h-full overflow-y-scroll border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto md:rounded-3xl lg:h-auto">
                <button
                  className="absolute right-9 top-9 transition hover:opacity-70"
                  onClick={handleClose}
                >
                  <IoClose size={36} />
                </button>
                {subject === "movement" && movementBody}
                {subject === "material" && materialBody}
                {subject === "affordability" && affordabilityBody}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TechnologyModal;
