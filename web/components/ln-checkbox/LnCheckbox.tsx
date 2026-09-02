import { HTMLAttributes } from 'react';
import "./ln-checkbox.scss";
import { Checkbox } from '@heroui/react';
import { Check } from '@gravity-ui/icons';

interface LnCheckboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    isSelected?: boolean; 
    onChange?: (checked: boolean) => void;
}

const LnCheckbox = ({ isSelected, onChange }: LnCheckboxProps) => {
    return (
        <Checkbox isSelected={isSelected} onChange={onChange}>
            <Checkbox.Content>
                <Checkbox.Control className="w-4.5 h-4.5 flex items-center justify-center data-[selected=true]:bg-neutral-800 data-[selected=true]:border-neutral-800 cursor-pointer transition-colors bg-white">
                    <Checkbox.Indicator className="text-white flex items-center justify-center">
                        <Check width={12} height={12} />
                    </Checkbox.Indicator>
                </Checkbox.Control>
            </Checkbox.Content>
        </Checkbox>
    );
};

export default LnCheckbox;
