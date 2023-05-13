import type { WsMsgCached, WsMsgExecuted, WsMsgExecuting, WsMsgProgress, WsMsgStatus } from './ComfyWsApi'
import type { PayloadID } from '../core/PayloadID'
import type { ComfySchemaJSON } from './ComfySchemaJSON'
import type { ComfyPromptJSON } from './ComfyPrompt'
import type { EmbeddingName } from 'src/core/Schema'
import type { ImageInfos, ImageUID } from 'src/core/GeneratedImageSummary'
import type { Requestable } from 'src/controls/Requestable'
import type { AbsolutePath } from 'src/utils/fs/BrandedPaths'
import type { ActionDefinitionID, FlowRunID } from 'src/back/FlowDefinition'
import type { CushyDBData } from 'src/core/WorkspaceHistoryJSON'
import type { ActionRef } from 'src/core/KnownWorkflow'

import { exhaust } from '../utils/ComfyUtils'

// =============================================================================================
// | FRONT => BACK                                                                             |
// =============================================================================================
export type FromWebview_SayReady = { type: 'say-ready'; frontID: string }
export type FromWebview_runFlow = { type: 'run-flow'; flowID: ActionDefinitionID; img?: AbsolutePath }
export type FromWebview_openExternal = { type: 'open-external'; uriString: string }
export type FromWebview_sayHello = { type: 'say-hello'; message: string }
export type FromWebview_Answer = { type: 'answer'; value: any }
export type FromWebview_Image = { type: 'image'; base64: string; imageID: ImageUID }
export type FromWebview_reset = { type: 'reset' }
export type MessageFromWebviewToExtension =
    | FromWebview_SayReady // report ready
    | FromWebview_runFlow // run
    | FromWebview_openExternal
    | FromWebview_sayHello // test messages
    | FromWebview_Answer // user interractions
    | FromWebview_Image
    | FromWebview_reset

// =============================================================================================
// | BACK => FRONT                                                                             |
// =============================================================================================
export type MessageFromExtensionToWebview = { uid: PayloadID } & MessageFromExtensionToWebview_

export type FromExtension_CushyStatus = { type: 'cushy_status'; connected: boolean }
export type FromExtension_FlowStart = { type: 'flow-start'; flowRunID: FlowRunID }
export type FromExtension_FlowCode = { type: 'flow-code'; flowRunID: FlowRunID; code: string }
export type FromExtension_FlowEnd = {
    type: 'flow-end'
    flowRunID: FlowRunID
    status: 'success' | 'failure'
    flowID: ActionDefinitionID
}
export type FromExtension_Print = { type: 'print'; message: string }
export type FromExtension_Schema = { type: 'schema'; schema: ComfySchemaJSON; embeddings: EmbeddingName[] }
export type FromExtension_Prompt = { type: 'prompt'; graph: ComfyPromptJSON }
export type FromExtension_Ls = { type: 'ls'; actions: ActionRef[] }
export type FromExtension_Images = { type: 'images'; images: ImageInfos[] }
export type FromExtension_ShowHtml = { type: 'show-html'; content: string; title: string }
export type FromExtension_ask = { type: 'ask'; request: { [key: string]: Requestable } }
export type FromExtension_SyncHistory = { type: 'sync-history'; history: CushyDBData }

export type MessageFromExtensionToWebview_ =
    /** wether or not cushy server is connected to at least on ComfyUI server */
    | FromExtension_CushyStatus
    | FromExtension_SyncHistory
    // flow start stop
    | FromExtension_FlowStart
    | FromExtension_FlowCode
    | FromExtension_FlowEnd
    // user interractions
    | FromExtension_ask
    | FromExtension_Print
    // schema & prompt (needs to be sent so webview can draw the graph)
    | FromExtension_Schema
    | FromExtension_Prompt
    | FromExtension_Ls
    // websocket updates
    | WsMsgStatus /* type 'status' */
    | WsMsgProgress /* type 'progress' */
    | WsMsgExecuting /* type 'executing'*/
    | WsMsgCached /* cached node running */
    | WsMsgExecuted /* type 'executed' */
    // generated images as transformed uri by vscode extension so they can be displayed in the webview
    | FromExtension_Images
    | FromExtension_ShowHtml

export const renderMessageFromExtensionAsEmoji = (msg: MessageFromExtensionToWebview) => {
    if (msg.type === 'cushy_status') return 'ℹ️'
    if (msg.type === 'flow-start') return '🎬'
    if (msg.type === 'flow-code') return '📝'
    if (msg.type === 'flow-end') return '🏁'
    if (msg.type === 'schema') return '📄'
    if (msg.type === 'prompt') return '📝'
    if (msg.type === 'status') return '📡'
    if (msg.type === 'progress') return '📊'
    if (msg.type === 'executing') return '📈'
    if (msg.type === 'execution_cached') return '💾'
    if (msg.type === 'executed') return '✅'
    if (msg.type === 'images') return '🖼️'
    if (msg.type === 'print') return '💬'
    if (msg.type === 'show-html') return '🥶'
    if (msg.type === 'ask') return '👋'
    if (msg.type === 'ls') return '📂'
    if (msg.type === 'sync-history') return '⏱️'
    exhaust(msg)
    return '❓'
}
