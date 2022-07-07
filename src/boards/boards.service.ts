import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { randomUUID } from 'crypto';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
	) {}
	createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto, user);
	}
	getBoardById(id: number): Promise<Board> {
		return this.boardRepository.getBoardById(id);
	}
	deleteBoard(id: number, user: User): Promise<void> {
		return this.boardRepository.deleteBoard(id, user);
	}
	updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		return this.boardRepository.updateBoardStatus(id, status);
	}
	getAllBoard(user: User): Promise<Board[]> {
		return this.boardRepository.getAllBoard(user);
	}
	/*
	** ======================= service에서 DB save 처리 ==========================
	*/
	//async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
	//	const {title, description} = createBoardDto; // 여러개 가능

	//	const board = this.boardRepository.create({
	//		title,
	//		description,
	//		status: BoardStatus.PUBLIC
	//	});

	//	await this.boardRepository.save(board);
	//	return board;
	//}
	//async getBoardById(id: number): Promise<Board> {
	//	const found = await this.boardRepository.findOne(id);

	//	if (!found) {
	//		throw new NotFoundException(`Cannot find Board whit id ${id}`);
	//	}

	//	return found;
	//}

	//async deleteBoard(id: number): Promise<void> {
	//	const result = await this.boardRepository.delete(id);

	//	if (result.affected === 0)
	//		throw new NotFoundException(`Cannot find Board with id ${id}`);
	//	//console.log('result', result);
	//}

	//async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
	//	const board = await this.getBoardById(id);

	//	board.status = status;
	//	await this.boardRepository.save(board);

	//	return board;
	//}

	//async getAllBoard(): Promise<Board[]> {
	//	return this.boardRepository.find();
	//}

	/*
	** =================================== Not DB ==============================
	*/
	//getAllBoards(): Board[] {
	//	return this.boards;
	//}

	//createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
	//	return this.boardRepository.createBoard(createBoardDto);
	//}

	//createBoard(createBoardDto: CreateBoardDto) {
	//	const {title, description} = createBoardDto; // 여러개 가능
	//	const board = {
	//		id: randomUUID(),
	//		title, // title: title 이름이 같다면 생략 가능
	//		description,
	//		status: BoardStatus.PUBLIC
	//	};
	//	this.boards.push(board);
	//	return board;
	//}


	//getBoardById(id: string):  newBoard {
	//	// find의 인자로 callback function을 이용하여 특정 게시물 반환
	//	const found = this.boards.find((board) => board.id == id);

	//	if (!found) {
	//		throw new NotFoundException(`Can't find Board with id ${id}`);
	//	}
	//	return found;
	//}



	//deleteBoard(id: string): void {
	//	// filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
	//	const found = this.getBoardById(id);
	//	this.boards = this.boards.filter((board) => board.id !== found.id);
	//}

	//updateBoardStatus(id: string, status: BoardStatus): Board {
	//	const board = this.getBoardById(id);
	//	board.status = status;
	//	return board;
	//}
}
