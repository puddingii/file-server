import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { extension, lookup } from 'mime-types';
import { diskStorage } from 'multer';
import generateRandomString from 'src/utils/generateRandomString';

export default diskStorage({
	destination: function (req, file, cb) {
		const path = req.body?.path || 'temp';
		// if (!path) {
		// 	return cb(
		// 		new InternalServerErrorException('Path is undefined', {
		// 			cause: new Error(),
		// 			description: 'directory path is undefined',
		// 		}),
		// 		null,
		// 	);
		// }

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}

		cb(null, path);
	},
	filename: async function (req, file, cb) {
		const name = req.body?.name || generateRandomString(32);
		const extByMimetype = extension(file.mimetype);
		if (!extByMimetype) {
			return cb(
				new InternalServerErrorException('알 수 없는 확장자입니다.', {
					cause: new Error(),
					description: `mimetype is unknown. [MIME-TYPE: ${file.mimetype}]`,
				}),
				null,
			);
		}

		const mimetypeAtFileExt = lookup(file.originalname);
		const ext =
			mimetypeAtFileExt === file.mimetype
				? file.originalname.split('.').at(-1)
				: extByMimetype;

		cb(null, `${name}.${ext}`);
	},
});
