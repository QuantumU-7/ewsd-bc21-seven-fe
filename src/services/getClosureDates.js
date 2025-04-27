import actionApi from "@/api/config";

export const getClosureDateService = async (values) => {
    const res = await actionApi().get(`/restrictions/1`, values);
    return res.data;
}
