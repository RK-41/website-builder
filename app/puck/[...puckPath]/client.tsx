"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import customConfig from "../../../puck.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={customConfig}
      data={data}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}

// export default function EditorPage() {
//   return (
//     <PuckProvider config={config}>
//       <Puck />
//     </PuckProvider>
//   );
// }
