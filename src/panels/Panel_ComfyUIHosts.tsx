import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { resolve } from 'path'
import { SQLITE_false, SQLITE_true } from 'src/db/SQLITE_boolean'
import { HostL } from 'src/models/Host'
import { SelectUI } from 'src/rsuite/SelectUI'
import { Panel } from 'src/rsuite/shims'
import { useSt } from 'src/state/stateContext'
import { asAbsolutePath } from 'src/utils/fs/pathUtils'
import { HostUI } from './host/HostUI'

export const LabelUI = observer(function LabelUI_(p: { children: React.ReactNode }) {
    return <div tw='whitespace-nowrap'>{p.children}</div>
})

export const Panel_ComfyUIHosts = observer(function Panel_ComfyUIHosts_(p: { hostID?: HostID }) {
    const st = useSt()
    const allHosts = st.hosts.items
    const mainHost = st.mainHost

    return (
        <Panel tw='w-full h-full flex flex-col gap-2 p-2'>
            <div tw='flex flex-wrap gap-2'>
                <SelectUI<HostL>
                    label='Current Host'
                    options={allHosts}
                    value={() => mainHost}
                    onChange={null}
                    getLabelText={(h) => h.data.name || h.id}
                />
            </div>
            <div tw='flex gap-1'>
                <div
                    tw='btn-sm btn btn-primary'
                    onClick={() => {
                        st.configFile.update(() => {
                            st.db.hosts.create({
                                hostname: '192.168.1.19',
                                port: 8188,
                                name: '192.168.1.19',
                                isLocal: SQLITE_false,
                                useHttps: SQLITE_false,
                                absolutePathToComfyUI: asAbsolutePath(resolve('comfy')),
                                isVirtual: SQLITE_false,
                            })
                        })
                    }}
                >
                    <span className='material-symbols-outlined'>add</span>
                    Add (local network)
                </div>
                <div
                    tw='btn-sm btn btn-primary'
                    onClick={() => {
                        st.db.hosts.create({
                            name: `cloud_${nanoid()}`,
                            hostname: `...`,
                            port: 443,
                            isLocal: SQLITE_false,
                            useHttps: SQLITE_true,
                            absolutePathToComfyUI: asAbsolutePath(resolve('comfy')),
                            isVirtual: SQLITE_false,
                        })
                    }}
                >
                    <span className='material-symbols-outlined'>add</span>
                    Add (cloud)
                </div>
            </div>
            <div tw='flex flex-wrap gap-2'>
                {allHosts?.map((host) => {
                    return <HostUI key={host.id} host={host} />
                })}
            </div>
        </Panel>
    )
})
