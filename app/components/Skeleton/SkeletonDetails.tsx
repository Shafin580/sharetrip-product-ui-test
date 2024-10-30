import SectionContainer from '@components/globals/SectionContainer'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SkeletonDetails() {
  return (
    <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.25,
        },
      },
    }}
    initial="hidden"
    animate="show"
  >
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <SectionContainer
          backgroundClassName="bg-gray-100"
          // className="container space-y-16 py-8 lg:py-[104px]"
          childrenOrientation="column"
          withPadding
          layoutAlign="start"
        >
            <div className="space-y-3">

                <h3 className="w-full max-w-[720px]">
                    <Skeleton />
                </h3>
                <div className={`flex space-x-2`}>
                    <div className={"relative size-9 rounded-full"}>
                    <Skeleton className='w-full h-full rounded-full'/>
                    </div>
                    <div className="flex flex-col">
                        <span className={"text-sm w-40"}><Skeleton/></span>
                        <span className="small text-muted-foreground w-40"><Skeleton/></span>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                <div className="col-span-2 space-y-16 lg:col-span-1">
                  <div className="space-y-6">
                    <h5 className='w-full max-w-[500px]'><Skeleton/></h5>
                    <div className="flex w-full justify-end lg:hidden">
                        <div className="flex w-full flex-col items-center space-y-6">
                          <div className="relative aspect-video w-full max-w-[520px]">
                            <Skeleton className='w-full h-full'/>
                          </div>
                          <div className="grid w-full max-w-[520px] grid-cols-2 gap-4">
                              <div className="relative col-span-1 aspect-video w-full">
                              <Skeleton className='w-full h-full'/>
                              </div>
                              <div className="relative col-span-1 aspect-video w-full">
                              <Skeleton className='w-full h-full'/>
                              </div>
                          </div>
                        </div>
                    </div>
                    <p><Skeleton count={5}/></p>
                  </div>
                  <div className="space-y-6">
                    <h5 className='w-full max-w-[500px]'><Skeleton/></h5>
                    <p><Skeleton count={5}/></p>
                  </div>
                 
                </div>
                <div className="hidden w-full justify-end lg:col-span-1 lg:flex">
                    <div className="flex w-full flex-col items-end space-y-6">
                      <div className="relative aspect-video w-full max-w-[520px]">
                      <Skeleton className='w-full h-full'/>

                      </div>
                      <div className="flex w-full max-w-[520px] justify-between">
                          <div className="relative aspect-video w-full max-w-[247.5px]">
                          <Skeleton className='w-full h-full'/>

                          </div>
                          <div className="relative aspect-video w-full max-w-[247.5px]">
                          <Skeleton className='w-full h-full'/>

                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </SectionContainer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default SkeletonDetails