import { recordGroupDefinitionsComponentState } from '@/object-record/record-group/states/recordGroupDefinitionsComponentState';
import { RecordGroupDefinition } from '@/object-record/record-group/types/RecordGroupDefinition';
import { sortRecordGroupDefinitions } from '@/object-record/record-group/utils/sortRecordGroupDefinitions';
import { recordIndexRecordGroupSortComponentState } from '@/object-record/record-index/states/recordIndexRecordGroupSortComponentState';

import { createComponentSelectorV2 } from '@/ui/utilities/state/component-state/utils/createComponentSelectorV2';
import { ViewComponentInstanceContext } from '@/views/states/contexts/ViewComponentInstanceContext';

export const visibleRecordGroupIdsComponentSelector = createComponentSelectorV2<
  RecordGroupDefinition['id'][]
>({
  key: 'visibleRecordGroupIdsComponentSelector',
  componentInstanceContext: ViewComponentInstanceContext,
  get:
    ({ instanceId }) =>
    ({ get }) => {
      const recordGroupDefinitions = get(
        recordGroupDefinitionsComponentState.atomFamily({
          instanceId,
        }),
      );

      const recordGroupSort = get(
        recordIndexRecordGroupSortComponentState.atomFamily({
          instanceId,
        }),
      );

      return sortRecordGroupDefinitions(
        recordGroupDefinitions,
        recordGroupSort,
      ).map((recordGroup) => recordGroup.id);
    },
});
