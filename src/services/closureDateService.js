import actionApi from "@/api/config";

export const closureDateService = async (values,newStatus=false) => {
    const url = newStatus ? `/restrictions` : `/restrictions/1`;
    const method = newStatus ? 'post' : 'put';
    const res = await actionApi()[method](url, values);
    return res.data;
}
