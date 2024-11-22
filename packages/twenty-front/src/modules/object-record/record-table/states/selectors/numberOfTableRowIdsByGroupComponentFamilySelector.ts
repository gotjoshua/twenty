import { RecordGroupDefinition } from '@/object-record/record-group/types/RecordGroupDefinition';
import { RecordTableComponentInstanceContext } from '@/object-record/record-table/states/context/RecordTableComponentInstanceContext';
import { tableRowIdsByGroupComponentFamilyState } from '@/object-record/record-table/states/tableRowIdsByGroupComponentFamilyState';
import { createComponentFamilySelectorV2 } from '@/ui/utilities/state/component-state/utils/createComponentFamilySelectorV2';

export const numberOfTableRowIdsByGroupComponentFamilySelector =
  createComponentFamilySelectorV2<number, RecordGroupDefinition['id']>({
    key: 'numberOfTableRowIdsByGroupComponentFamilySelector',
    componentInstanceContext: RecordTableComponentInstanceContext,
    get:
      ({ instanceId, familyKey }) =>
      ({ get }) =>
        get(
          tableRowIdsByGroupComponentFamilyState.atomFamily({
            instanceId,
            familyKey,
          }),
        ).length,
  });
