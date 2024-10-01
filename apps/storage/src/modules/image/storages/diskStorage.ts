import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';
import { extension } from 'mime-types';
import { diskStorage } from 'multer';
import generateRandomString from '@file/global/dist/utils/generateRandomString';
import { Root } from 'src/enum';

export default diskStorage({
	destination: function (req, file, cb) {
		const path = resolve(Root, 'temp');

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}

		cb(null, path);
	},
	filename: async function (req, file, cb) {
		const name = req.body?.name || generateRandomString(32);
		const ext = extension(file.mimetype);
		if (!ext) {
			return cb(
				new InternalServerErrorException('알 수 없는 확장자입니다.', {
					cause: new Error(),
					description: `mimetype is unknown. [MIME-TYPE: ${file.mimetype}]`,
				}),
				null,
			);
		}

		cb(null, `${name}.${ext}`);
	},
});
