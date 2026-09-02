import { HTMLAttributes } from 'react';
import LnChip from '../ln-chip/LnChip';

interface AccountLevelChipProps extends HTMLAttributes<HTMLDivElement> {
    level: 'PRO' | 'NORMAL'
}

const AccountLevelChip = ({ level }: AccountLevelChipProps) => {
    return (
        <LnChip
            title={level}
            color="success"
            variant="tertiary"
        />
    );
};

export default AccountLevelChip;
