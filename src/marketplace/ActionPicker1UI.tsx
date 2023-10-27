import { observer } from 'mobx-react-lite'
import { Tree } from 'rsuite'
import { asActionPath } from 'src/marketplace/ActionPath'
import { assets } from 'src/front/ui/assets'
import { asRelativePath } from 'src/utils/fs/pathUtils'
import { useSt } from '../front/FrontStateCtx'
import { TooltipUI } from '../front/ui/layout/TooltipUI'
import { getIconForFilePath } from '../front/ui/utils/filePathIcon'

export const ActionPicker1UI = observer(function ActionPicker1UI_(p: {}) {
    const st = useSt()
    const tb = st.library
    return (
        <Tree
            expandItemValues={tb.expandedPaths}
            tw='overflow-x-hidden overflow-y-auto flex-grow h-full'
            key={st.library.updatedAt}
            data={st.library.treeData}
            renderTreeIcon={(x) => {
                return <>{x.expand ? '▿' : '▸'}</>
            }}
            onExpand={(values, node) => {
                const value = node.value as string
                if (tb.isExpanded(value)) tb.collapse(value)
                else tb.expand(value)
            }}
            renderTreeNode={(node) => {
                const isExpanded = tb.isExpanded(node.value as string)
                return (
                    <>
                        {node.children ? (
                            <span className='material-symbols-outlined'>folder</span>
                        ) : typeof node.value === 'string' ? (
                            getIconForFilePath(node.value)
                        ) : (
                            '❓'
                        )}{' '}
                        <div tw='text-ellipsis overflow-hidden whitespace-nowrap'>{node.label}</div>
                        <div tw='ml-auto'>
                            {isExpanded && (
                                <TooltipUI>
                                    <img tw='mr-1' style={{ width: '1rem' }} src={assets.tsLogo} alt='' />
                                    <div>is being type-checked</div>
                                </TooltipUI>
                            )}
                        </div>
                    </>
                )
            }}
            // renderTreeIcon={() => <>{'>'}</>}
            // value={value}
            onChange={async (_value: any) => {
                if (typeof _value !== 'string') throw new Error('tree selection value is not a string')
                const value = asRelativePath(_value)

                const isFolder = st.library.folderMap.has(value)
                // console.log(_value, `isFolder: ${isFolder}`)
                if (isFolder) {
                    if (tb.isExpanded(value)) tb.collapse(value)
                    else tb.expand(value)
                    return
                    // return console.log(`❌ "${_value}" a folder`)
                }

                const actionPath = asActionPath(value)
                // 1. focus paf
                const paf = st.library.actionsByPath.get(actionPath)
                if (paf == null) throw new Error(`paf not found for ${value}`)
                st.layout.addAction(actionPath)
                // pj.focusActionFile(paf)
                // // 2. if paf has a tool, focus it
                // console.log(value, paf)
                // await paf.load({ logFailures: true })
                // const tool0 = paf.mainTool
                // if (tool0 == null) return null
                // pj.focusTool(tool0)
            }}
        />
    )
})
