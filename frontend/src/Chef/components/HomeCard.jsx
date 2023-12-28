import React from 'react'
import { GlobeIcon } from '@radix-ui/react-icons';

function HomeCard() {
  return (
    <div className="my-8 ml-4 max-w-xs overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-8 shadow-2xl hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
      <div className="mb-4">
        <GlobeIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="mb-2 font-medium tracking-tight text-neutral-100">
        Global Connectivity
      </h3>
      <p className="text-sm text-neutral-400">
        Illuminate your online presence with our enhanced global connectivity
        options.
      </p>
    </div>

  )
}

export default HomeCard
