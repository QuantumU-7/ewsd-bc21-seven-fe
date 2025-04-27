import actionApi from "@/api/config";

export const closureDateService = async (values) => {
    const res = await actionApi().put(`/restrictions/1`, values);
    return res.data;
}
