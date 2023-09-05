import { useEffect, useState } from "react";
import { ResponseDataType, ResponseDataTypeWidthCount } from "./types/response";


interface Hooks {
    [key: string]: () => void
}

interface Options {
    error?: (code: number, msg: string) => void;
    beforeLoad?: () => void;
    afterLoad?: () => void;
    hooks?: Hooks;
}

export interface RebackWidthCount<T> {
    data: T;
    count: number;
    setData: (data: T) => void;
    setCount: (count: number) => void;
    callback: Hooks
}

export interface Reback<T> {
    data: T;
    setData: (data: T) => void;
    callback: Hooks
}



/**
 * 获取带有count属性的钩子函数
 * @param callback 回调函数
 * @returns 
 */


export function useFetchWithCount<T>(callback: (...params) => Promise<ResponseDataTypeWidthCount<T[]>>, options?: Options, ...params): RebackWidthCount<T[]> {

    const [data, setData] = useState<T[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        (async () => {

            options.beforeLoad && options.beforeLoad();

            const result = await callback(...params);

            options.afterLoad && options.afterLoad();

            if (result.code === 0 && result.data) {
                setData(result.data.datas);
                setCount(result.data.count)
            } else if (result.code !== 0 && (!result.data) && options && options.error) {
                options.error(result.code, result.msg);
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...params])

    return {
        data,
        count,
        setData,
        setCount,
        callback: options.hooks
    }
}

/**
 * 获取数据的钩子函数
 * @param callback 回调函数
 * @returns 
 */

export function useFetch<T>(callback: (...params) => Promise<ResponseDataType<T>>, initial, options?: Options, ...params): Reback<T> {
    const [data, setData] = useState<T>(initial)

    useEffect(() => {
        (async () => {
            const result = await callback(...params);
            if (result.code === 0 && result.data) {
                setData(result.data);
            } else if (options && options.error) {
                options.error(result.code, result.msg);
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...params])
    return { data, setData, callback: options.hooks };
}







