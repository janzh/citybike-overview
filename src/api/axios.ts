import axios from "axios";

const clientIdentifier = "jzh-konsument";

interface GetParams {
    url: string;
}

export const get = <ResponseData>({ url }: GetParams): Promise<ResponseData> =>
    axios
        .get(url, {
            headers: {
                "Client-Identifier": clientIdentifier,
            },
        })
        .then((res) => res.data);
