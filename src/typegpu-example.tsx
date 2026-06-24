import { useConfigureContext, useFrame, useRoot, useUniform } from '@typegpu/react';
import { Canvas } from 'react-native-webgpu';
import { d, std } from 'typegpu';

export function TypeGpuExample() {
  const root = useRoot();
  const { ref, ctxRef } = useConfigureContext({ alphaMode: 'premultiplied' });

  const timeUniform = useUniform(d.f32);

  const pipeline = root.createRenderPipeline({
    vertex: ({ $vertexIndex: vid }) => {
      'use gpu';

      const positions = [d.vec2f(0.0, 0.5), d.vec2f(-0.5, -0.5), d.vec2f(0.5, -0.5)];
      const colors = [d.vec3f(1, 0, 0), d.vec3f(0, 1, 0), d.vec3f(0, 0, 1)];
      const offset = d.vec2f(std.sin(timeUniform.$), std.cos(timeUniform.$)) * 0.3;

      return {
        // $position: d.vec4f(positions[vid], 0, 1),
        $position: d.vec4f(positions[vid] + offset, 0, 1), // operator overloading
        color: colors[vid],
      };
    },
    fragment: ({ color }) => {
      'use gpu';

      // return d.vec4f(0.114, 0.447, 0.941, 0.5);
      return d.vec4f(color, 1);
    },
  });

  useFrame(({ elapsedSeconds }) => {
    if (ctxRef.current) {
      pipeline.withColorAttachment({ view: ctxRef.current }).draw(3);

      timeUniform.write(elapsedSeconds);

      ctxRef.current.present?.();
    }
  });

  return <Canvas ref={ref} style={{ aspectRatio: 1 }} transparent />;
}
