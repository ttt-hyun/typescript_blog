"use server"
export async function printTextAction(id: string) {
    return { errors: {
        id: !id ? "Id is required" : undefined,
    } }
}