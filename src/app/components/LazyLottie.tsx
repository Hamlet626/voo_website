// "use client"
// ///see more https://medium.com/@alonmiz1234/lazy-load-lottie-animation-in-react-e58e67e2aa74
// import dynamic from 'next/dynamic';
// import { Skeleton } from '@mantine/core';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { type LottieComponentProps } from 'lottie-react';
// import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';

// const LazyLottieComponent = lazy(() => import('lottie-react'));

// interface LottieProps<T extends Record<string, unknown>> {
// //   getAnimationData: () => Promise<T>;
//   animationData: string;
//   id: string;
// }

// export function LazyLottie<T extends Record<string, unknown>>({
// //   getAnimationData,
//   animationData,
//   id,
//   ref,
//   ...props
// }: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
//   const { data } = useQuery({
//     queryKey: [id],
//     queryFn: async () => {
//       void import('lottie-react'); // Trigger the library lazy load even if the animationData is not ready
//       const animation:any = await import(`../../../public/lottie/${animationData}`);
//       return animation;
//     },
//     enabled: typeof window !== 'undefined',
//   });

//   if (!data) return <Skeleton height={props.height} width={props.width} />;

//   return (
//     <Suspense fallback={<Skeleton height={props.height} width={props.width} />}>
//       <LazyLottieComponent animationData={data} {...props} />
//     </Suspense>
//   );
// }

// const queryClient = new QueryClient();

// export function QueryLottieProvider<T extends Record<string, unknown>>({
//   //   getAnimationData,
//     animationData,
//     id,
//     ref,
//     ...props
//   }: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
  
//     return (
//       <QueryClientProvider client={queryClient} >
//         <LazyLottie animationData={animationData} id={id} {...props} />
//     </QueryClientProvider>
//     );
//   }