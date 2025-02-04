import { Static, Type } from '@sinclair/typebox'
// import { Value, ValueError } from '@sinclair/typebox/value'
// import { Either, resultFailure, resultSuccess } from 'src/types/Either'
import { optionalString, string } from './schema'

// DECK --------------------------------------
// export type PackageManifest = {
//     /** package name */
//     name: string

//     /** author name */
//     authorName: string

//     /** package summary */
//     description: string

//     /** relative path from package root to an image */
//     relativeIconPath?: string

//     /** List of all cards exposed by this deck */
//     cards?: AppMetadata[]
// }

// DECK --------------------------------------
export type AppMetadata = {
    /**
     * app name;
     * defaults to the file name without extension
     * */
    name?: string

    /**
     * app tags;
     * @default []
     * */
    tags?: string[]

    /** app image that will be displayed in the tree picker */
    illustration?: string

    /** high priority means this app will be displayed other others */
    priority?: number

    /** app style in the library */
    style?: 'A' | 'B' | 'C' | 'D'

    /** this description will show-up at the top of the action form */
    description?: string

    /** tags */
    categories?: string[]

    /** dependencies of your action */
    customNodeRequired?: string[]

    /** who did that? */
    author?: string

    /**
     * an example of what this app can produce
     * this may be displayed in the output Panel on first app opening
     */
    sampleOutput?: string
}

export const AppMetadataSchema = Type.Object(
    {
        deckRelativeFilePath: Type.String(),
        name: Type.Optional(Type.String()),
        illustration: Type.Optional(Type.String()),
        priority: Type.Optional(Type.Number()),
        style: Type.Optional(Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C'), Type.Literal('D')])),
        description: Type.Optional(Type.String()),
        categories: Type.Optional(Type.Array(Type.String())),
        customNodeRequired: Type.Optional(Type.Array(Type.String())),
        author: Type.Optional(Type.String()),
    },
    { additionalProperties: false },
)

/* ✅ */ type _AppMetadataSchemaT = Static<typeof AppMetadataSchema>
/* ✅ */ const _a2: AppMetadata = 0 as any as _AppMetadataSchemaT

// export const DeckSchema = Type.Object(
//     {
//         $schema: optionalString('the schema version'),
//         name: string('customize your package name'),
//         authorName: string('customize your author name'),
//         description: string('short summary of your package'),
//         relativeIconPath: optionalString('local path to an image in your package that should be used'),
//         cards: Type.Optional(Type.Array(AppMetadataSchema)),
//     },
//     { additionalProperties: false },
// )

// export const parseDeckManifest = (manifest: unknown): Either<ValueError[], PackageManifest> => {
//     const errors: ValueError[] = [...Value.Errors(DeckSchema, manifest)]
//     if (errors.length > 0) {
//         console.log('[🦊] Invalid Package manifest:', errors)
//         return resultFailure(errors)
//     }
//     return resultSuccess(manifest as PackageManifest)
//     // return Value.Decode(DeckSchema, manifest)
// }

/* ✅ */ // type _DeckSchemaT = Static<typeof DeckSchema>
/* ✅ */ // const _a1: PackageManifest = 0 as any as _DeckSchemaT

// export type ManifestError =
//     | { type: 'no manifest' }
//     | { type: 'invalid manifest'; errors: ValueError[] }
//     | { type: 'crash'; error: unknown }
