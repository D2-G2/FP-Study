import { RequestHandler } from 'express';
import bookServices from './books-service';
import logger from '../../shared/logger';
import bookDb from './book-db';
import { Book, Response } from '../../shared/type.js'

export interface GetAllBookParams {
    categoryId: number,
    limit: number,
    offset: number,
    isNew: boolean
}

//req.params 가져오는 부분과 Response 객체 만드는 부분 모듈화
function makeParams(query: any) {
    let limit = parseInt(query.limit as string);
    let offset = parseInt(query.offset as string);
    return {
        categoryId: parseInt(query.categoryId as string),
        limit: limit,
        offset: limit * offset,
        isNew: query.isNew === 'true' ? true : false
    }
}

function makeResponse(data: any, message: string | null, err: string | null) {
    return {
        data: data,
        message: message,
        err: err
    }
}

//layered architecture -> stratifed architecture
//Controller-Service-DB로 연속적으로 호출하며 이어지는 게 아니라
//이 함수에서 Service(DB제외한 비즈니스 로직)와 DB를 호출
//Service에 해당하는 로직이 없어 DB만 호출


const getAllBooks: RequestHandler = async (req, res, next) => {
    let params: GetAllBookParams = makeParams(req.query);
    let bookData: Book[];
    let result: Response = {};

    if (!params.isNew) {
        try {
            bookData = await bookDb.getBookByCategory(params);
            result = makeResponse(bookData, 'Success', null);
            res.status(200).json(result);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.message);
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        try {
            bookData = await bookDb.getAllBooks(params.limit, params.offset);
            result = makeResponse(bookData, 'Success', null);
            res.status(200).json(result);
        } catch (e: any) {
            result = makeResponse(null, 'Failed', e.message);
            logger.reportResponseErr(req.url, req.method, e.messsage);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

const getBookDetail: RequestHandler = async (req, res, next) => {
    const { bookId } = req.params;
    let result: Response = {};
    try {
        const bookData = await bookDb.getBookById(parseInt(bookId));
        result = makeResponse(bookData, 'Success', null);
        res.status(200).json(result);
    } catch (e: any) {
        result = makeResponse(null, 'Failed', e.message);
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

export { getAllBooks, getBookDetail };