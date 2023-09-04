import { useEffect, useState } from "react";
import { ResponseDataType, ResponseDataTypeWidthCount } from "./types/response";


interface Options {
    error?: (code: number, msg: string) => void;
}

export interface RebackWidthCount<T> {
    data: T;
    count: number;
    setData: (data: T) => void;
    setCount: (count: number) => void;

}

export interface Reback<T> {
    data: T;
    setData: (data: T) => void;
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
            const result = await callback(...params);
            if (result.code === 0 && result.data) {
                setData(result.data.datas);
                setCount(result.data.count)
            } else if (options && options.error) {
                options.error(result.code, result.msg);
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...params])

    return {
        data,
        count,
        setData,
        setCount
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
    return { data, setData };
}







