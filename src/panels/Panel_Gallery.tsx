import { observer } from 'mobx-react-lite'
import { Button, Input, Slider, Toggle } from 'src/rsuite/shims'
import { parseFloatNoRoundingErr } from 'src/utils/misc/parseFloatNoRoundingErr'
import { FieldAndLabelUI } from 'src/widgets/misc/FieldAndLabelUI'
import { useSt } from '../state/stateContext'
import { ImageUI } from '../widgets/galleries/ImageUI'
import { OutputPreviewWrapperUI } from 'src/outputs/OutputPreviewWrapperUI'

export const Panel_Gallery = observer(function VerticalGalleryUI_(p: {}) {
    const st = useSt()
    return (
        <div //
            className='flex flex-col bg-base-100 h-full'
            style={{ background: st.configFile.value.galleryBgColor }}
        >
            <GalleryControlsUI />
            <div className='flex flex-wrap overflow-auto'>
                {/* <LatentPreviewUI /> */}
                {st.imageToDisplay.map((img) => (
                    <OutputPreviewWrapperUI key={img.id} output={img} size={st.gallerySize}>
                        <ImageUI img={img} />
                    </OutputPreviewWrapperUI>
                ))}
            </div>
        </div>
    )
})

export const LatentPreviewUI = observer(function LatentPreviewUI_(p: {}) {
    const st = useSt()
    const preview = st.latentPreview
    if (preview == null) return
    return (
        <img
            //
            style={{
                objectFit: 'contain',
                opacity: 1,
                padding: '0.2rem',
                borderRadius: '.5rem',
                width: st.gallerySizeStr,
                height: st.gallerySizeStr,
            }}
            src={preview.url}
        />
    )
})
export const GalleryControlsUI = observer(function GalleryControlsUI_(p: { children?: React.ReactNode }) {
    const st = useSt()
    // const preview = st.preview
    return (
        <div tw='flex overflow-auto gap-2 px-2 bg-base-200 w-full flex-shrink-0'>
            {p.children}
            <FieldAndLabelUI label='Size'>
                <Slider
                    style={{ width: '5rem' }}
                    min={32}
                    max={200}
                    onChange={(ev) => (st.gallerySize = parseFloatNoRoundingErr(ev.target.value))}
                    value={st.gallerySize}
                />
            </FieldAndLabelUI>
            <FieldAndLabelUI label='background'>
                <div tw='join'>
                    <Button
                        tw='btn-neutral join-item '
                        icon={<span className='material-symbols-outlined'>format_color_reset</span>}
                        size='xs'
                        onClick={() => st.configFile.update({ galleryBgColor: undefined })}
                    />
                    <Input
                        tw='join-item input-xs'
                        type='color'
                        value={st.configFile.value.galleryBgColor || '#000000'}
                        onChange={(ev) => st.configFile.update({ galleryBgColor: ev.target.value })}
                    />
                </div>
            </FieldAndLabelUI>
            <FieldAndLabelUI label='full-screen'>
                <Toggle
                    checked={st.showPreviewInFullScreen ?? true}
                    onChange={(ev) => (st.showPreviewInFullScreen = ev.target.checked)}
                />
            </FieldAndLabelUI>
            <FieldAndLabelUI label='in-panel'>
                <Toggle checked={st.showPreviewInPanel} onChange={(ev) => (st.showPreviewInPanel = ev.target.checked)} />
            </FieldAndLabelUI>
            <FieldAndLabelUI label='hover opacity'>
                <Slider
                    style={{ width: '5rem' }}
                    step={0.01}
                    min={0}
                    max={1}
                    onChange={(ev) => (st.galleryHoverOpacity = parseFloatNoRoundingErr(ev.target.value))}
                    value={st.galleryHoverOpacity}
                />
            </FieldAndLabelUI>
        </div>
    )
})
