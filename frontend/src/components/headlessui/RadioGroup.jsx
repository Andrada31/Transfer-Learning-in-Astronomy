import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const resnetModels = [
  { name: 'ResNet-18', parameters: '11.7M', depth: 18, trainedOn: ['ImageNet', 'CIFAR-10'] },
  { name: 'ResNet-34', parameters: '21.8M', depth: 34, trainedOn: ['ImageNet', 'CIFAR-100'] },
  { name: 'ResNet-50', parameters: '25.6M', depth: 50, trainedOn: ['ImageNet', 'MS COCO'] },
  { name: 'ResNet-101', parameters: '44.5M', depth: 101, trainedOn: ['ImageNet', 'OpenImages'] },
  { name: 'ResNet-152', parameters: '60.2M', depth: 152, trainedOn: ['ImageNet', 'Places365'] },
];

export default function RadioButton() {
  const [selected, setSelected] = useState(resnetModels[0]);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-2xl">
        <RadioGroup by="name" value={selected} onChange={setSelected} aria-label="ResNet Model" className="space-y-2">
          {resnetModels.map((model) => (
            <Radio
              key={model.name}
              value={model}
              className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm/6">
                  <p className="font-semibold text-white">{model.name}</p>
                  <div className="flex gap-2 text-white/50">
                    <div>Parameters: {model.parameters}</div>
                    <div aria-hidden="true">&middot;</div>
                    <div>Depth: {model.depth}</div>
                    <div aria-hidden="true">&middot;</div>
                    <div>Trained on: {model.trainedOn.join(', ')}</div>
                  </div>
                </div>
                <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
