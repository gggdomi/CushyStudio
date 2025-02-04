import { observer } from 'mobx-react-lite'
import { Button } from 'src/rsuite/shims'
import { useSt } from '../../../state/stateContext'
import { openExternal } from '../../layout/openExternal'

export const OpenComfyExternalUI = observer(function OpenComfyExternalUI_(p: {}) {
    const st = useSt()
    return (
        <Button
            size='sm'
            appearance='subtle'
            className='self-start'
            icon={<span className='material-symbols-outlined'>open_in_new</span>}
            onClick={() => openExternal(st.getServerHostHTTP())}
        >
            {/* ComfyUI Web */}
        </Button>
    )
})
