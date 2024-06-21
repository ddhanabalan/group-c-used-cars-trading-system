export default function PropsRow({ type, value }: { type: string, value: string }) {
    return (
        <tr> <td className="font-bold"> {type} </td> <td> {value} </td> </tr>
    )
}