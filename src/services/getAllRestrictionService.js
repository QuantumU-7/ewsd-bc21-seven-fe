import actionApi from "@/api/config";

export const getAllRestrictionService = async (values) => {
    const res = await actionApi().get(`/restrictions`, values);
    return res.data;
}
