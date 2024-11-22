import { useCurrentRecordGroupId } from '@/object-record/record-group/hooks/useCurrentRecordGroupId';
import { RecordTableRow } from '@/object-record/record-table/record-table-row/components/RecordTableRow';
import { isRecordGroupTableSectionToggledComponentState } from '@/object-record/record-table/record-table-section/states/isRecordGroupTableSectionToggledComponentState';
import { tableAllRowIdsComponentState } from '@/object-record/record-table/states/tableAllRowIdsComponentState';
import { tableRowIdsByGroupComponentFamilyState } from '@/object-record/record-table/states/tableRowIdsByGroupComponentFamilyState';
import { useRecoilComponentFamilyValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentFamilyValueV2';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { isDefined } from '~/utils/isDefined';

export const RecordTableRecordGroupRows = () => {
  const currentRecordGroupId = useCurrentRecordGroupId();

  const allRowIds = useRecoilComponentValueV2(tableAllRowIdsComponentState);

  const recordGroupRowIds = useRecoilComponentFamilyValueV2(
    tableRowIdsByGroupComponentFamilyState,
    currentRecordGroupId,
  );

  const isRecordGroupTableSectionToggled = useRecoilComponentFamilyValueV2(
    isRecordGroupTableSectionToggledComponentState,
    currentRecordGroupId,
  );

  const rowIndexMap = useMemo(
    () => new Map(allRowIds.map((id, index) => [id, index])),
    [allRowIds],
  );

  return (
    <motion.tbody
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isRecordGroupTableSectionToggled ? 'auto' : 0,
        opacity: isRecordGroupTableSectionToggled ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      style={{
        overflow: 'hidden',
        display: 'table-row-group',
      }}
    >
      {recordGroupRowIds.map((recordId) => {
        const rowIndex = rowIndexMap.get(recordId);

        if (!isDefined(rowIndex)) {
          throw new Error(`Row index for record id ${recordId} not found`);
        }

        return (
          <RecordTableRow
            key={recordId}
            recordId={recordId}
            rowIndex={rowIndex}
          />
        );
      })}
    </motion.tbody>
  );
};
