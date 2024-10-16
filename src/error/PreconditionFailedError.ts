export function preconditionFailed(): never {
    const error = new Error("Precondition Failed");
    (error as any).status = 412;
    throw error;
}
