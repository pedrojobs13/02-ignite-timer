import { useContext } from "react";
import { cyclesContext } from "../../context/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export function History() {
    const { cycles } = useContext(cyclesContext)


    return (
        <HistoryContainer>

            <h1>Meu Histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicío</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            cycles.map((cycle) => {
                                return (

                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount}</td>
                                        <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                            addSuffix: true,
                                            locale: ptBR
                                        })}</td>
                                        <td>
                                            {(cycle.finishedDate) && <Status statusColor="green">
                                                Concluído
                                            </Status>
                                            }
                                            {
                                                (cycle.interruptedDate) &&
                                                <Status statusColor="red">
                                                    Interropido
                                                </Status>
                                            }
                                            {
                                                (!cycle.finishedDate && !cycle.interruptedDate) &&
                                                <Status statusColor="yellow">
                                                    Em Andamento
                                                </Status>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                        <button>Apagar</button>
                    </tbody>
                </table>

            </HistoryList>
        </HistoryContainer>
    )
}