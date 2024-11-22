import { recordGroupDefinitionsComponentState } from '@/object-record/record-group/states/recordGroupDefinitionsComponentState';
import { RecordGroupDefinition } from '@/object-record/record-group/types/RecordGroupDefinition';

import { createComponentSelectorV2 } from '@/ui/utilities/state/component-state/utils/createComponentSelectorV2';
import { ViewComponentInstanceContext } from '@/views/states/contexts/ViewComponentInstanceContext';

export const hiddenRecordGroupIdsComponentSelector = createComponentSelectorV2<
  RecordGroupDefinition['id'][]
>({
  key: 'hiddenRecordGroupIdsComponentSelector',
  componentInstanceContext: ViewComponentInstanceContext,
  get:
    ({ instanceId }) =>
    ({ get }) => {
      const recordGroupDefinitions = get(
        recordGroupDefinitionsComponentState.atomFamily({
          instanceId,
        }),
      );

      return recordGroupDefinitions.reduce(
        (acc, recordGroup) => {
          if (!recordGroup.isVisible) {
            acc.push(recordGroup.id);
          }

          return acc;
        },
        [] as RecordGroupDefinition['id'][],
      );
    },
});
