import React, { useState, useEffect, useRef } from 'react';
import {toast} from 'react-hot-toast';
import jsPDF from 'jspdf';
import '../styles/Tontines_Transactions.css';
import 'jspdf-autotable';


const Allparticipants = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const searchInputRef = useRef(null);
    const tableRowsRef = useRef(null);
    const tableHeadingsRef = useRef(null);

    const sortTable = (column) => {
        const order = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);

        const rows = Array.from(tableRowsRef.current.children);
        const sortedRows = rows.sort((a, b) => {
            let firstValue = a.children[column].textContent;
            let secondValue = b.children[column].textContent;

            if (column === 3) {
                firstValue = new Date(firstValue);
                secondValue = new Date(secondValue);
                return order === 'asc' ? firstValue - secondValue : secondValue - firstValue;
            } else if (column === 5 || column === 0) {
                firstValue = parseFloat(firstValue.replace(/[^\d.]/g, ''));
                secondValue = parseFloat(secondValue.replace(/[^\d.]/g, ''));
                return order === 'asc' ? firstValue - secondValue : secondValue - firstValue;
            } else {
                return order === 'asc' ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
            }
        });

        sortedRows.forEach(row => tableRowsRef.current.appendChild(row));
    };

    useEffect(() => {
        const searchTable = () => {
            const searchData = searchTerm.toLowerCase();
            const rows = Array.from(tableRowsRef.current.children);
        
            rows.forEach((row, index) => {
                const tableData = row.textContent.toLowerCase();
                const hide = tableData.indexOf(searchData) === -1;
                row.style.transitionDelay = hide ? '0s' : (index / 25 + 's');
                row.style.opacity = hide ? 0 : 1;
                row.style.pointerEvents = hide ? 'none' : 'auto';
                row.classList.toggle('hide', hide);
            });
        };
        
        
        

        const searchInput = searchInputRef.current;
        const tableHeadings = tableHeadingsRef.current;

        searchInput.addEventListener('input', searchTable);

        return () => {
            searchInput.removeEventListener('input', searchTable);
        };
    }, [searchTerm]);

    const downloadPDF = () => {
        // Créer un document PDF
        const doc = new jsPDF();

        // Obtenir les données de la table
        const tableData = [];
        const rows = tableRowsRef.current.children;
        for (let i = 0; i < rows.length; i++) {
            const row = [];
            const cells = rows[i].children;
            for (let j = 0; j < cells.length; j++) {
                row.push(cells[j].textContent);
            }
            tableData.push(row);
        }

        // Ajouter des en-têtes de colonne
        const headers = ['Id', 'Participant', 'Type', 'Date', 'Statut', 'Montant'];

        // Ajouter la table au document PDF
        doc.autoTable({
            head: [headers],
            body: tableData,
        });

        // Télécharger le fichier PDF
        doc.save('transactions.pdf');
        if(doc){
            toast.success("Téléchargement du PDF Réussi");
        }
        else{
            toast.error("Echec du téléchargement du pdf");
        }
    };
    
    
    
    return (
        <div className='tontine_transaction'>
            <main className="table" id="customers_table">
                <section className="table__header">
                    <h1>Membres de la Tontine</h1>
                    <div className="input-group">
                        <input ref={searchInputRef} type="search" placeholder="Search Data..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <img src="../../assets/img/search.png" alt="" />
                    </div>
                    <div className="export__file">
                        <label htmlFor="export-file" className="export__file-btn" title="Télécharger"></label>
                        <input type="checkbox" id="export-file" />
                        <div className="export__file-options">
                            <label>Fichier &nbsp; &#10140;</label>
                            <label onClick={downloadPDF}>PDF <img src="../../images/pdf.png" alt="" /></label>
                        </div>
                    </div>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr ref={tableHeadingsRef}>
                                <th onClick={() => sortTable(0)}>
                                    Id<span className="icon-arrow">{sortColumn === 0 ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                                </th>
                                <th onClick={() => sortTable(1)}>
                                    Nom<span className="icon-arrow">{sortColumn === 1 ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                                </th>
                                <th onClick={() => sortTable(2)}>
                                    mail<span className="icon-arrow">{sortColumn === 2 ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                                </th>
                                <th onClick={() => sortTable(3)}>
                                    Date d'adhésion<span className="icon-arrow">{sortColumn === 3 ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                                </th>
                                <th onClick={() => sortTable(4)}>
                                    Statut<span className="icon-arrow">{sortColumn === 4 ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                                </th>
                                <th onClick={() => sortTable(5)}>
                                    Tel<span className="icon-arrow">{sortColumn === 5 ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody ref={tableRowsRef}>
                            <tr>
                                <td>125</td>
                                <td>Patricia</td>
                                <td>patricia20@gmail.com</td>
                                <td>02/11/2025</td>
                                <td>Vice-présidente</td>
                                <td>6 55 55 58 56</td>
                            </tr>
                            <tr>
                                <td>125236</td>
                                <td>Emmanuel</td>
                                <td>Emmanuel@yahoo.cm</td>
                                <td>02/09/2024</td>
                                <td>Président</td>
                                <td>6 34 32 48 20</td>
                            </tr>
                            <tr>
                                <td>56236</td>
                                <td>Albert</td>
                                <td>albert60@gmail.com</td>
                                <td>10/30/2023</td>
                                <td>simple membres</td>
                                <td>693 52 45 33</td>
                            </tr>
                            <tr>
                                <td>1255998</td>
                                <td>Idriss</td>
                                <td>Idriss@gmail.xom</td>
                                <td>02/11/2025</td>
                                <td>Trésorier</td>
                                <td>698587452</td>
                            </tr>
                            <tr>
                                <td>125236</td>
                                <td>Privat</td>
                                <td>Privat@gmail.com</td>
                                <td>02/11/2024</td>
                                <td>simple-membre</td>
                                <td>659898575</td>
                            </tr>
                            <tr>
                                <td>589632</td>
                                <td>Jules-grégoire</td>
                                <td>Julesgrégoire@gmail.com</td>
                                <td>01/31/2023</td>
                                <td>simple-membre</td>
                                <td>659868974</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Allparticipants;


