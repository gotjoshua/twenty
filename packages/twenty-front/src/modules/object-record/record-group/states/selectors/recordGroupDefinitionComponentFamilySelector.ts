import { recordGroupDefinitionsComponentState } from '@/object-record/record-group/states/recordGroupDefinitionsComponentState';
import { RecordGroupDefinition } from '@/object-record/record-group/types/RecordGroupDefinition';
import { createComponentFamilySelectorV2 } from '@/ui/utilities/state/component-state/utils/createComponentFamilySelectorV2';

import { ViewComponentInstanceContext } from '@/views/states/contexts/ViewComponentInstanceContext';
import { isDefined } from '~/utils/isDefined';

export const recordGroupDefinitionComponentFamilySelector =
  createComponentFamilySelectorV2<
    RecordGroupDefinition,
    RecordGroupDefinition['id']
  >({
    key: 'recordGroupDefinitionComponentFamilySelector',
    componentInstanceContext: ViewComponentInstanceContext,
    get:
      ({ instanceId, familyKey }) =>
      ({ get }) => {
        const recordGroupDefinitions = get(
          recordGroupDefinitionsComponentState.atomFamily({
            instanceId,
          }),
        );
        const recordGroupDefinition = recordGroupDefinitions.find(
          (recordGroupDefinition) => recordGroupDefinition.id === familyKey,
        );

        if (!isDefined(recordGroupDefinition)) {
          throw new Error(
            `Record group definition with id ${familyKey?.toString()} not found`,
          );
        }

        return recordGroupDefinition;
      },
  });
