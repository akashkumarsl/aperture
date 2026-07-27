import { BackgroundScene } from "@/components/three/BackgroundScene";
import { SceneIntro } from "@/components/scenes/SceneIntro";
import { SceneThesis } from "@/components/scenes/SceneThesis";
import { SceneRefinery } from "@/components/scenes/SceneRefinery";
import { SceneStakes } from "@/components/scenes/SceneStakes";
import { SceneDiagnose } from "@/components/scenes/SceneDiagnose";
import { SceneEngines } from "@/components/scenes/SceneEngines";
import { SceneTraining } from "@/components/scenes/SceneTraining";
import { SceneFeedbackLoop } from "@/components/scenes/SceneFeedbackLoop";
import { SceneFinal } from "@/components/scenes/SceneFinal";
import { StructuredData } from "@/components/layout/StructuredData";

/**
 * The complete seven-act scroll experience. A single fixed WebGL world sits
 * behind a stack of narrative scenes; the camera flies through it as the visitor
 * scrolls, tying every act into one continuous film.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <BackgroundScene />

      <div className="relative z-10">
        <SceneIntro />
        <SceneThesis />
        <SceneRefinery />
        <SceneStakes />
        <SceneDiagnose />
        <SceneEngines />
        <SceneTraining />
        <SceneFeedbackLoop />
        <SceneFinal />
      </div>
    </>
  );
}
