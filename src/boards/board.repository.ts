import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		const {title, description} = createBoardDto; // 여러개 가능
		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user: user
		});

		await this.save(board);
		return board;
	}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.findOne(id);

		if (!found) {
			throw new NotFoundException(`Cannot find Board whit id ${id}`);
		}

		return found;
	}

	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.delete({id, user});

		if (result.affected === 0)
			throw new NotFoundException(`Cannot find Board with id ${id}`);
	}

	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
		await this.save(board);

		return board;
	}

	async getAllBoard(user: User): Promise<Board[]> {
		const query = this.createQueryBuilder('board');

		query.where('board.userId = :userId', {userId: user.id})
		const boards = await query.getMany();
		return boards;
	}
}
