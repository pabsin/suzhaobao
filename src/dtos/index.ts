import { photoSchema, specsSchema, userSchema } from "@/schemas";
import { createDto } from "@/utils";

export class UserDto extends createDto(userSchema) {}
export class SpecsDto extends createDto(specsSchema) {}
export class PhotoDto extends createDto(photoSchema) {}
