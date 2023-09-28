import * as I from '@rsuite/icons'
import { observer } from 'mobx-react-lite'
import { IconButton, InputGroup, Popover, SelectPicker, Whisper } from 'rsuite'
import { useProject } from '../../../front/ProjectCtx'
import { useSt } from '../../FrontStateCtx'
import { TypescriptHighlightedCodeUI } from '../TypescriptHighlightedCodeUI'

export const ToolPickerUI = observer(function ToolPickerUI_(p: {
    //
    // draft: DraftL
}) {
    const st = useSt()
    const pj = useProject()
    const db = st.db
    // const draft = p.draft
    const tools = st.toolsSorted
    let grup = ''
    return (
        <div>
            {/*  */}
            <InputGroup size='sm'>
                <InputGroup.Addon>
                    <span className='material-symbols-outlined'>search</span>
                </InputGroup.Addon>
                <SelectPicker
                    //
                    className='grow'
                    data={tools}
                    size='sm'
                    labelKey='name'
                    valueKey='id'
                    value={pj.data.activeToolID}
                    onChange={(v) => {
                        if (v == null) return
                        // draft.update({ toolID: v })
                    }}
                />
            </InputGroup>
            {db.tools.map((tool) => {
                const codeTS = tool.data.codeTS
                const action = (
                    <div
                        className='ml-2 hover:bg-gray-700 cursor-pointer text-ellipsis overflow-hidden'
                        key={tool.id}
                        style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            // fontWeight: focusedDraft?.tool.id === tool.id ? 'bold' : 'normal',
                        }}
                        // active={focusedDraft?.tool.id === tool.id}
                        onClick={() => {
                            const correspondingDraft = db.drafts.find((d) => d.tool.id === tool.id)
                            if (correspondingDraft == null) return // 🔴
                            // graph.update({ focusedDraftID: correspondingDraft.id })
                        }}
                    >
                        {codeTS && (
                            <Whisper
                                enterable
                                placement='autoHorizontalStart'
                                speaker={
                                    <Popover>
                                        <TypescriptHighlightedCodeUI code={codeTS} />
                                    </Popover>
                                }
                            >
                                <IconButton size='xs' icon={<I.Code />} appearance='subtle' />
                            </Whisper>
                        )}
                        {tool.name}
                    </div>
                )
                if (tool.data.owner != grup) {
                    grup = tool.data.owner
                    return (
                        <>
                            <div className='[background:#280606] flex gap-1'>
                                <span className='material-symbols-outlined'>person_outline</span>
                                {grup}
                            </div>
                            {action}
                        </>
                    )
                }
                return action
            })}
        </div>
    )
})
