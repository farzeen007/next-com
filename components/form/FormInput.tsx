
import { UseFormRegister } from 'react-hook-form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'


type ErrorProps = {
    error?: string
}

const FormInput = ({ mainCls = "grid gap-3", label, id, name, register, error }: { mainCls?: string, label: string, name: string, id: string, register: UseFormRegister<any>, error?: string }) => {
    return (
        <div className={mainCls}> <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...register(name)} />
            {error && <div className='text-red-400 text-xs'>{error?.message}</div>}
        </div>
    )
}

export default FormInput