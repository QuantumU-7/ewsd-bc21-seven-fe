import actionApi from "@/api/config";

export const getAnonymousStatus = async () => {
    try {
        const response = await actionApi().get(`/dashboard/anon-stats`)
        // if (!response.ok) {
        //     const error = await response.json();
        //     throw new Error(error.message || 'Failed to get anonymous status');
        // }

        return response.data
    } catch (error) {
        console.error('Error liking idea:', error);
        throw error;
    }
};