import PocketBase from "pocketbase";
export const pb = new PocketBase('https://pb.sarprasku.komangdavid.com');
pb.autoCancellation(false)

export async function getBorrowings() {
    const data = await pb.collection('borrowings').getFullList({
        sort: '-created',
    });
    return data;
};

export async function getFacilities() {
    const data = await pb.collection('facilities').getFullList({
        sort: '-created',
    });
    return data;
};

export async function postBorrowing(data: any) {
    const record = await pb.collection('borrowings').create(data);
};