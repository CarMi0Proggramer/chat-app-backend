import { File } from "../entities/File.entity";

export class FileMapper {
    static map(file: File) {
        const { path, ...restProps } = file;

        return restProps;
    }
}
