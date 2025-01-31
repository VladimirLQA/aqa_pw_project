export type TOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type TPartialPropIn<T, K extends keyof T> = TOmit<T, K> & Partial<Pick<T, K>>;

export type TPrettify<T> = { [k in keyof T]: T[k] } & {};