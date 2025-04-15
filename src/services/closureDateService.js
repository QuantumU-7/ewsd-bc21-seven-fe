import actionApi from "@/api/config";

export const closureDateService = async (values) => {
    const res = await actionApi().post(`/restrictions/`, values);
    return res.data;
}
